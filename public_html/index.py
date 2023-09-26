import http.server

HandlerClass = http.server.SimpleHTTPRequestHandler


HandlerClass.extensions_map['.js'] = 'application/javascript'
HandlerClass.extensions_map['.mjs'] = 'application/javascript'
HandlerClass.extensions_map['.json'] = 'application/json'

http.server.test(HandlerClass, port=8000)

