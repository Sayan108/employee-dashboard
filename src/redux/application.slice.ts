import { TFormData } from "@/components/modalForm";
import { findObjectWithMatchingValue } from "@/utils";
import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IProductState, productInitialState } from "../redux.constants";

interface IApplicationState {
  employeeList: TFormData[];
  searchEmployeeeList: TFormData[];
}

const IApplicationStateInitialState: IApplicationState = {
  employeeList: [],
  searchEmployeeeList: [],
};

export const applicationSlice = createSlice({
  name: "application",
  initialState: IApplicationStateInitialState,

  reducers: {
    addNewEmployeeInList: (
      state: IApplicationState,
      action: PayloadAction<TFormData>
    ) => {
      return {
        ...state,
        employeeList: [...state.employeeList, action.payload],
      };
    },

    searchEmployeeList: (
      state: IApplicationState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        searchEmployeeeList: state.employeeList.filter((employee) =>
          findObjectWithMatchingValue(employee, action.payload)
        ),
      };
    },
  },
});
export const { addNewEmployeeInList, searchEmployeeList } =
  applicationSlice.actions;

export const applicationReducer = applicationSlice.reducer;

export const rootReducer = combineReducers({
  // cart: cartReducer,
  application: applicationReducer,
});
