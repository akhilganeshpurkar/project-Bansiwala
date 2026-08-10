from pathlib import Path
from bs4 import BeautifulSoup

files = [
    Path('about.html'),
    Path('bookings.html'),
    Path('contact.html'),
    Path('gallery.html'),
    Path('index.html'),
    Path('menu.html'),
]

for path in files:
    html = path.read_text(encoding='utf-8')
    pretty = BeautifulSoup(html, 'html.parser').prettify()
    path.write_text(pretty, encoding='utf-8')

print('formatted', len(files), 'files')
