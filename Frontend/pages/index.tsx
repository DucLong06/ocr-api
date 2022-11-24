import { useEffect, useRef, useState } from "react";
import {
    Group,
    Stack,
    Text,
    Image,
    Progress,
    Button,
    Loader,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { _IApiResponse } from "../utils/interfaces/IApiResponse";
import axiosClient from "../utils/apis/RequestHelper";

interface Idata {
    ImageBase64: string;
}

const Home = () => {
    let [imageData, setImageData] = useState<null | string>(null);
    const [imageOutput, setImageOutput] = useState<null | string>(null);
    const loadFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUri = reader.result;
            setImageData(imageDataUri as string);
            console.log(imageData);
        };
        reader.readAsDataURL(file);
    };

    const [ocrResult, setOcrResult] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {}, []);

    const post = async (path: string, data: Idata): Promise<_IApiResponse> => {
        return axiosClient.post(`/${path}`, data);
    };

    const handleExtract = async () => {
        setLoading(true);
        let imgBase64 = imageData as string;
        const response = await post("img2text", {
            ImageBase64: imgBase64.replace(/^data:image\/[a-z]+;base64,/, ""),
        });
        setOcrResult(response.body.text);
        setImageData(
            "data:image/jpeg;base64," +
                response.body.imagebase64.replace("b", "").replace("'", "")
        );

        setLoading(false);
    };

    return (
        <div className="">
            <Group align="initial" style={{ padding: "10px" }}>
                <Stack style={{ flex: "1" }}>
                    <Dropzone
                        onDrop={(files) => loadFile(files[0])}
                        accept={IMAGE_MIME_TYPE}
                        multiple={false}
                    >
                        {() => (
                            <Text
                                size="xl"
                                inline
                                style={{ textAlign: "center" }}
                            >
                                Kéo hình ảnh vào đây hoặc bấm để chọn tập tin
                            </Text>
                        )}
                    </Dropzone>

                    {!!imageData && (
                        <Image src={imageData} style={{ width: "100%" }} />
                    )}
                </Stack>

                <Stack style={{ flex: "1" }}>
                    <div className="flex gap-11">
                        <Button
                            disabled={!imageData}
                            onClick={handleExtract}
                            className="bg-blue-500"
                        >
                            Nhận dạng chữ in
                        </Button>
                        <Button
                            disabled={!imageData}
                            onClick={handleExtract}
                            className="bg-blue-500"
                        >
                            Bóc tách thông tin CV
                        </Button>
                        <Button
                            disabled={!imageData}
                            onClick={handleExtract}
                            className="bg-blue-500"
                        >
                            Bóc tách thông tin CMND
                        </Button>
                    </div>

                    {/* <Text>{progressLabel.toUpperCase()}</Text>
                    <Progress value={progress * 100} /> */}

                    <Stack>
                        <Text size="xl" className="">
                            Kết quả nhận dạng
                        </Text>
                        {loading ? (
                            <Loader variant="dots" size="xl" />
                        ) : (
                            <Text
                                style={{
                                    fontFamily: "monospace",
                                    background: "gray",
                                    padding: "10px",
                                }}
                            >
                                {ocrResult}
                            </Text>
                        )}
                    </Stack>
                </Stack>
            </Group>
        </div>
    );
};

export default Home;
