import os
from pathlib import Path
import json

pathe = "./anime"

class Obj():
    
    def __init__(self, path, jsonn):
        self.path = path
        self.json = jsonn
        self.files = {"content":[]}

        
    def PushJson(self, file):
        self.files["content"].append(file)
        with open(self.json, 'w') as f:
            json.dump(self.files, f, indent=2)


    def fetcher(self):  
        folders = []
        filess = []
        lk = {}

        for f in os.listdir(self.path):
            if os.path.isdir(os.path.join(self.path, f)):
                folders += f + "//"
        folders = "".join(folders)
        folders = folders.split("//")


        #print(folders)
        
        p = len(folders)
        
        for i in range(p - 1):
            path = Path(self.path + "/" + folders[i])
            fileInPath = path.iterdir()
            image = ""
            for item in fileInPath:
                if item.is_file():
                    if item.name == "cover.jpg":
                        image = item.name
                    else:
                        filess += item.name+"$"
                        
                
            filess = "".join(filess)
            
            filess = filess.split("$")
            filess = filess[0 : len(filess) - 1]

            lk[folders[i]] = []
            lk[folders[i]].append([{"folder" : folders[i], "files" : filess, "image": image}])
            #print(lk[folders[i]])
            i += 1
            filess = []

        #print(lk)
        self.PushJson(lk)    

f1 = Obj(pathe, 'anime.json')

f1.fetcher()



    



