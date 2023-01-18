import { isRejectedWithValue, isFulfilled } from "@reduxjs/toolkit";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  console.log(api, "api");

  if (isRejectedWithValue(action)) {
    const {
      meta: {
        arg: { endpointName, type },
        baseQueryMeta: {
          request: { url },
        },
      },
      payload: {
        data: { message: errorMessage },
      },
    } = action;
    console.log(
      `--------------ERROR------------
    ${endpointName}`,
      {
        type,
        url,
        errorMessage,
      }
    );
  }
  if (isFulfilled(action)) {
    const {
      meta: {
        arg: { endpointName, type },
        baseQueryMeta: {
          request: { url },
        },
      },
      payload,
    } = action;
    console.log(endpointName, {
      type,
      url,
      payload,
    });
  }

  return next(action);
};
