# import cv2
# import pytesseract
# from pytesseract import Output
import json


# img = cv2.imread("./east331 (10)_4_6549.jpg")
# d = pytesseract.image_to_data(img, output_type=Output.DICT)
# n_boxes = len(d["text"])
# list_outputs = []
# for i in range(n_boxes):
#     if int(d["conf"][i]) > 60:
#         dictionary = {
#             "Text": d["text"][i],
#             "X": d["top"][i],
#             "Y": d["left"][i],
#             "Width": d["width"][i],
#             "Height": d["height"][i],
#         }

#         list_outputs.append(dictionary)
# with open("ok.json", "w", encoding="utf-8") as jsonfile:
#     json.dump(list_outputs, jsonfile, ensure_ascii=False)

f = open(
    "/media/longhd/New Volume/ocr-api/backend/39cfbf90-9b5c-4881-8a4f-0b530d5e7535/Screenshot from 2022-05-05 10-55-20.png.json",
    "r",
    encoding="utf-8",
)
data = json.load(f)
f.close()
print(type(data))
