import { TFormData } from "./components/modalForm";

export function formatDate(inputDate: string): string {
  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Split the input date into parts
  const [year, month, day] = inputDate.split("-");

  // Get the month name from the months array
  const monthName = months[parseInt(month) - 1]; // -1 because months are 0-indexed in the array

  // Construct the formatted date
  return `${monthName} ${parseInt(day)}, ${year}`;
}

export function findObjectWithMatchingValue(
  obj: TFormData,
  searchString: string
): { matchedKey: string; value: string } | null {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key as keyof TFormData];

    if (
      value &&
      value.toString().toLowerCase().includes(searchString.toLowerCase())
    ) {
      return { matchedKey: key, value: value.toString() };
    }
  }

  return null;
}
