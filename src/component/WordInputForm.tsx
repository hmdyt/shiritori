import { TextField, Button } from "@mui/material";

type wordInputFormProps = {
    handleSubmit: (word: string) => void;
    handleSubmitEnter: (word: string) => void;
    handleChange: (word: string) => void;
    word: string;
    name: string;
    isButtonActive: boolean;
};

export const WordInputForm = (props: wordInputFormProps) => {
    return (
        <>
            <TextField
                onChange={(event) => props.handleChange(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        props.handleSubmitEnter(props.word);
                    }
                }}
                value={props.word}
                label={props.name}
            />
            <Button
                onClick={() => props.handleSubmit(props.word)}
                disabled={!props.isButtonActive}
            >
                Submit
            </Button>
        </>
    )
}