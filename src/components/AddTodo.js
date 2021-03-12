import React from "react";
import {
  TextField,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { useCreateTodo } from "../hooks/todos/useCreateTodo";
import { useInputValue } from "../hooks/useInputValue";

export const AddTodo = () => {
  const { mutate, isLoading } = useCreateTodo();
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue("");

  const onAddTodo = () => {
    mutate(
      {
        text: inputValue,
      },
      {
        onSuccess: clearInput,
      }
    );
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            value={inputValue}
            onChange={changeInput}
            onKeyPress={(event) => keyInput(event, onAddTodo)}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onAddTodo}
            disabled={isLoading}
          >
            {isLoading && (
              <Box position="absolute" left={5} top={7}>
                <CircularProgress size={20} color="inherit" />
              </Box>
            )}
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
