"""Build a deterministic local D2RMM installation ZIP; never uploads anything."""
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
mod = root / 'mods/ProbabilisticRuneDowngrade'
version = json.loads((mod / 'mod.json').read_text())['version']
report = json.loads((root / 'docs/LOCAL_VALIDATION.json').read_text())
assert report['status'] == 'PASS', 'Run local validation first'
for name, digest in report['inputs'].items():
    assert hashlib.sha256((root/name).read_bytes()).hexdigest() == digest, f'Stale validation: {name}'
files = [*mod.rglob('*'), root/'README.md', root/'LICENSE', root/'CHANGELOG.md', * (root/'docs').glob('*')]
files = sorted(p for p in files if p.is_file())
dist = root/'dist'
dist.mkdir(exist_ok=True)
archive = dist/f'ProbabilisticRuneDowngrade-{version}.zip'
manifest = {str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
with ZipFile(archive, 'w', compression=ZIP_DEFLATED) as z:
    for p in files:
        info = ZipInfo(str(p.relative_to(root)), date_time=(2026,11,2,0,0,0))
        info.compress_type = ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        z.writestr(info, p.read_bytes())
    info = ZipInfo('MANIFEST.sha256.json', date_time=(2026,11,2,0,0,0))
    info.compress_type = ZIP_DEFLATED
    info.external_attr = 0o100644 << 16
    z.writestr(info, json.dumps(manifest, indent=2)+'\n')
with ZipFile(archive) as z:
    assert z.testzip() is None
    for name, digest in manifest.items():
        assert hashlib.sha256(z.read(name)).hexdigest() == digest
    assert 'mods/ProbabilisticRuneDowngrade/mod.json' in z.namelist()
    assert all(not n.startswith('/') and '..' not in n.split('/') for n in z.namelist())
digest = hashlib.sha256(archive.read_bytes()).hexdigest()
(dist/(archive.name+'.sha256')).write_text(digest+'  '+archive.name+'\n')
print(f'{archive}\nSHA256 {digest}\n{len(manifest)} files verified')
