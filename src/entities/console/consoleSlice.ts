import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';
import {setProjects} from '../project/projectSlice';
import {initialLogs} from './constants';
import type {AppDispatch} from '../../app/store';
import {vouchersData} from '../project/constants';

const getRandomLogs = (count: number) =>
  [...initialLogs].sort(() => 0.5 - Math.random()).slice(0, count);

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

interface CommandResult {
  command: string;
  response: string;
}

interface ConsoleCommand {
  name: string;
  handler: (dispatch: AppDispatch) => string | Promise<string>;
}

interface ConsoleState {
  logs: string[];
  input: string;
  pending: boolean;
  showBomb: boolean;
  showGtaStars: boolean;
  vouchers: boolean;
}

const initialState: ConsoleState = {
  logs: getRandomLogs(5),
  input: '',
  pending: false,
  showBomb: false,
  showGtaStars: false,
  vouchers: false,
};

export const executeCommand = createAsyncThunk<CommandResult, string>(
  'console/executeCommand',
  async(command: string, {rejectWithValue, dispatch}) => {
    try {
      const trimmed = command.trim().toLowerCase();
      if (!trimmed) return {command: '', response: ''};

      const commands: ConsoleCommand[] = [
        {
          name: 'help',
          handler: () => `[INFO] Command list: ${commands
            .map((cmd) => cmd.name)
            .join(', ')
          }`,
        },
        {
          name: 'about',
          handler: () => '[INFO] This is notConsole 📟',
        },
        {
          name: 'clear',
          handler: () => '',
        },
        {
          name: 'sv_cheats 1',
          handler: async(dispatch) => {
            await delay(2000);
            dispatch(consoleSlice.actions.setShowBomb(true));
            return '[EASTEREGG] Fire in the hole! 💅';
          },
        },
        {
          name: 'youwonttakemealive',
          handler: async(dispatch) => {
            await delay(2000);
            dispatch(consoleSlice.actions.setShowGtaStars(true));
            return '[EASTEREGG] 🚨🚨🚨 BUSTED!';
          },
        },
        {
          name: 'whereismyvoucher',
          handler: async(dispatch) => {
            await delay(2000);
            dispatch(setProjects(vouchersData));
            return '[EASTEREGG] 🎟️ Voucher not found. Try checking under the couch?';
          },
        },
      ];

      const cmd = commands.find((c) => c.name === trimmed);
      if (cmd) {
        const response = await cmd.handler(dispatch as AppDispatch);
        return {command: `> ${command}`, response};
      }

      await delay(2000);
      return {command: `> ${command}`, response: `[SYS] command not found: ${command}`};
    } catch (error) {
      return rejectWithValue(`[WARN] ${error}`);
    }
  }
);

const consoleSlice = createSlice({
  name: 'console',
  initialState,
  reducers: {
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
    addLog(state, action: PayloadAction<string>) {
      if (action.payload) {
        state.logs.push(action.payload);
      }
    },
    clearLogs(state) {
      state.logs = [];
    },
    setShowBomb(state, action: PayloadAction<boolean>) {
      state.showBomb = action.payload;
    },
    setShowGtaStars(state, action: PayloadAction<boolean>) {
      state.showGtaStars = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeCommand.pending, (state) => {
        state.pending = true;
        if (state.input.trim()) {
          state.logs.push(`> ${state.input}`);
        }
        state.input = '';
      })
      .addCase(executeCommand.fulfilled, (state, action) => {
        state.pending = false;
        if (action.payload.response) {
          state.logs.push(action.payload.response);
        }
        if (action.meta.arg === 'clear') {
          state.logs = [];
        }
      })
      .addCase(executeCommand.rejected, (state, action) => {
        state.pending = false;
        if (action.payload) {
          state.logs.push(action.payload as string);
        }
      });
  },
});

export const {setInput, addLog, clearLogs, setShowBomb} = consoleSlice.actions;
export default consoleSlice.reducer;
