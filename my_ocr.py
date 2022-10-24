import tensorflow as tf
import cv2

def predict_model(sess,path_to_image):
    img = cv2.imread(path_to_image)
    # ghi ra file gray cho giống y đầu vào của aocr gốc
    matGray_OpenCV = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    success, encoded_image = cv2.imencode('.jpg', matGray_OpenCV)
    png_bytes = encoded_image.tobytes()
    input_feed = {}
    input_feed['input_image_as_bytes:0'] = png_bytes  # truyền vào chỗi bytes nén PNG, AOCR sé decode_png để trả lại ma trận ảnh
    input_feed['is_training:0'] = False
    output_feed = ['prediction:0', 'probability:0']
    
    outputs = sess.run(output_feed, input_feed)
    text = outputs[0]
    probability = outputs[1]
    text = text.decode('utf-8')
    
    # return (text, probability)
    return (str(text), probability)


def load_model_recog(init,meta,checkpoint):
    sess_init = tf.Session()
    tf.train.import_meta_graph(init)
    sess = sess_init
    saver = tf.train.import_meta_graph(meta)
    saver.restore(sess, tf.train.latest_checkpoint(checkpoint))
    return sess

