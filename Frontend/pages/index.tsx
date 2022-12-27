import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import axiosClient from "../utils/apis/RequestHelper";
import { _IApiResponse } from "../utils/interfaces/IApiResponse";

interface Idata {
    ImageBase64: string;
}

const Home = () => {
    const [imageData, setImageData] = useState<null | string>(null);
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
        try {
            let imgBase64 = imageData as string;
            const response = await post("img2text", {
                ImageBase64: imgBase64.replace(
                    /^data:image\/[a-z]+;base64,/,
                    ""
                ),
            });
            setOcrResult(response.body.text);
            setImageData("data:image/jpeg;base64," + response.body.imagebase64);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const handleCV = async () => {
        setLoading(true);
        try {
        } catch (error) {}
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
                            disabled={!imageData || loading}
                            onClick={handleExtract}
                            className="bg-blue-500"
                        >
                            Nhận dạng chữ in
                        </Button>
                        <Button
                            disabled={!imageData || loading}
                            onClick={handleExtract}
                            className="bg-blue-500"
                        >
                            Bóc tách thông tin CV
                        </Button>
                        <Button
                            disabled={!imageData || loading}
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
                            <div className="flex justify-center">
                                <Loader size={100} variant="dots" />;
                            </div>
                        ) : (
                            <Text
                                style={{
                                    fontFamily: "monospace",
                                    background: "gray",
                                    padding: "10px",
                                    whiteSpace: "pre-line",
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
