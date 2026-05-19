import * as XLSX from "xlsx";

export type ExcelSheetConfig = {
  sheetName: string;
  data: any[];
};

export const exportToExcel = (sheets: ExcelSheetConfig[], filename: string) => {
  const wb = XLSX.utils.book_new();

  sheets.forEach(({ sheetName, data }) => {
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });
  XLSX.writeFile(wb, `${filename}_${new Date().getTime()}.xlsx`);
};
