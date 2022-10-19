echo 'MAKE FOLDERS'
INPUT=./input
if [ -d "$INPUT" ]; then
    echo "$INPUT exists."
else
    mkdir -p $INPUT 
fi
LOG=./log
if [ -d "$LOG" ]; then
    echo "$LOG exists."
else
    mkdir -p $LOG 
fi
OUTPUT=./output
if [ -d "$OUTPUT" ]; then
    echo "$OUTPUT exists."
else
    mkdir -p $OUTPUT 
fi
echo 'RUN SERVER'
python app.py
