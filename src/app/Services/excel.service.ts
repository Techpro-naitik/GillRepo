import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {

  constructor() { }

  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   XLSX.utils.sheet_add_aoa(worksheet, [["Your Mesage Goes Here"]], { origin: 0 });
  //   worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   var range = XLSX.utils.decode_range(worksheet['!ref']);
  //   for (var C = range.s.r; C <= range.e.r; ++C) {
  //     var address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C
  //     if (!worksheet[address]) continue;
  //     worksheet[address].v = worksheet[address].v.charAt(0).toUpperCase() + worksheet[address].v.substr(1).toLowerCase();
  //   }
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    var worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      [`          ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} ${excelFileName}          `]]);
    worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 }
    ];
    worksheet['!cols'] = wscols;
    XLSX.utils.sheet_add_json(worksheet, json, { origin: "A2" });
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    for (var C = range.s.r; C <= range.e.r; ++C) {
      var address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C
      if (!worksheet[address]) continue;
      worksheet[address].v = worksheet[address].v.charAt(0).toUpperCase() + worksheet[address].v.substr(1).toLowerCase();
    }
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
