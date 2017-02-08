import json
import os

def main():
    with open("package.json", encoding = "utf-8") as data_file:
        data = json.loads(data_file.read())

    data["homepage"] = "http://tokgozmusa.github.io/snake-react"

    with open("package.json", "w") as outfile:
        json.dump(data, outfile, indent = 2)
        print("", file = outfile)

    os.system("npm run deploy")

    del data["homepage"]

    with open("package.json", "w") as outfile:
        json.dump(data, outfile, indent = 2)
        print("", file = outfile)

if __name__ == "__main__":
    main()
