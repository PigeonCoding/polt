import http.server
import socketserver
import fetcher
import socket
import multiprocessing
from multiprocessing import Process


port = 8001
Port = 0
handler = http.server.SimpleHTTPRequestHandler

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
print(s.getsockname()[0])
s.close()

class web(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.o = fetcher.Obj('./anime', 'anime.json')
        self.o.fetcher()
        if self.path == '/':
            self.path = 'index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def Start(portt):
    with socketserver.TCPServer(("", port),web) as f:
        Port = portt
        print(port)
        f.serve_forever()
        f.server_close()


if __name__ == "__main__":
    for i in range(multiprocessing.cpu_count() - 3):
        procs = []
        proc = Process(target=Start, args=(port,))
        port += 1
        procs.append(proc)
        proc.start()
        
    
    for proc in procs:
        proc.join()
