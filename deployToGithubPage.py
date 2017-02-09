import json
import os

def main():
    with open("package.json", "r", encoding = "utf-8") as data_file:
        data = json.loads(data_file.read())

    data["homepage"] = "http://tokgozmusa.github.io/snake-react"

    with open("package.json", "w") as output_file:
        json.dump(data, output_file, indent = 2)
        print("", file = output_file)

    os.system("npm run deploy")

    del data["homepage"]

    with open("package.json", "w", encoding = "utf-8") as output_file:
        json.dump(data, output_file, indent = 2)
        print("", file = output_file)

if __name__ == "__main__":
    main()
