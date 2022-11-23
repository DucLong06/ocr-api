import { useEffect, useRef, useState } from "react";
import { Group, Stack, Text, Image, Progress, Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { createWorker } from "tesseract.js";

const Home = () => {
    const [imageData, setImageData] = useState<null | string>(null);
    const loadFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUri = reader.result;
            setImageData(imageDataUri as string);
        };
        reader.readAsDataURL(file);
    };

    const [progress, setProgress] = useState(0);
    const [progressLabel, setProgressLabel] = useState("idle");
    const [ocrResult, setOcrResult] = useState("");

    const workerRef = useRef<Tesseract.Worker | null>(null);
    useEffect(() => {
        workerRef.current = createWorker({
            logger: (message) => {
                if ("progress" in message) {
                    setProgress(message.progress);
                    setProgressLabel(
                        message.progress == 1 ? "Done" : message.status
                    );
                }
            },
        });
        return () => {
            workerRef.current?.terminate();
            workerRef.current = null;
        };
    }, []);

    const handleExtract = async () => {
        setProgress(0);
        setProgressLabel("starting");

        const worker = workerRef.current!;
        await worker.load();
        await worker.loadLanguage("vie");
        await worker.initialize("vie");

        const response = await worker.recognize(imageData!);
        setOcrResult(response.data.text);
        console.log(response.data);
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
                            <Text size="xl" inline style={{textAlign:"center"}}>
                                Kéo hình ảnh vào đây hoặc bấm để chọn tập tin
                            </Text>
                        )}
                    </Dropzone>

                    {!!imageData && (
                        <Image src={imageData} style={{ width: "100%" }} />
                    )}
                </Stack>

                <Stack style={{ flex: "1" }}>
                    <div className="" style={{ display: "flex", gap: "30px" }}>
                        <Button
                            disabled={!imageData || !workerRef.current}
                            onClick={handleExtract}
                        >
                            Nhận dạng chữ in
                        </Button>
                        <Button
                            disabled={!imageData || !workerRef.current}
                            onClick={handleExtract}
                        >
                            Bóc tách thông tin CV
                        </Button>
                        <Button
                            disabled={!imageData || !workerRef.current}
                            onClick={handleExtract}
                        >
                            Bóc tách thông tin CMND
                        </Button>
                        <Button
                            disabled={!imageData || !workerRef.current}
                            onClick={handleExtract}
                        >
                            Segment Chữ In
                        </Button>
                        <Button
                            disabled={!imageData || !workerRef.current}
                            onClick={handleExtract}
                        >
                            Segment CV
                        </Button>
                    </div>

                    <Text>{progressLabel.toUpperCase()}</Text>
                    <Progress value={progress * 100} />

                    {!!ocrResult && (
                        <Stack>
                            <Text size="xl">RESULT</Text>
                            <Text
                                style={{
                                    fontFamily: "monospace",
                                    background: "gray",
                                    padding: "10px",
                                }}
                            >
                                {ocrResult}
                            </Text>
                        </Stack>
                    )}
                </Stack>
            </Group>
        </div>
    );
};

export default Home;
