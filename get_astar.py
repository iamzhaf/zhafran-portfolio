import urllib.request

url = 'https://upload.wikimedia.org/wikipedia/en/6/69/A%2ASTAR_Logo.svg'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as response, open('public/logos/astar.svg', 'wb') as out_file:
        data = response.read()
        out_file.write(data)
    print("Success")
except Exception as e:
    print(f"Error: {e}")
