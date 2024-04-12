
import * as fs from 'fs';
// const XLSX = require('xlsx');
// import * as XLSX from 'xlsx/xlsx.mjs';
import * as XLSX from 'xlsx';


import { REQUEST_CODE, REQUEST_MSG } from '@/utils/enums';
import type { Response } from '@/utils/types';
import { SetMetadata } from '@nestjs/common/decorators';
/**
 * @description: 统一返回体
 */
export const responseMessage = <T = any>(
  data,
  msg: string = REQUEST_MSG.SUCCESS,
  code: number = REQUEST_CODE.SUCCESS,
): Response<T> => {
  return { data, msg, code };
};


/**
 * @description: 生成文件上传文件夹
 * @param {string} filePath
 */
export const checkDirAndCreate = (filePath: string): void => {
  const pathArr = filePath.split('/');
  let checkPath = '.';
  let item: string;
  for (item of pathArr) {
    checkPath += `/${item}`;
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath);
    }
  }
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


export const exportToExcel = (data, filename = 'test') => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
  // 生成 Excel 文件
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  // 返回文件流
  return {
    buffer,
    filename: `${filename}.xlsx`,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
};
export const convertBufferToJson = async (file) => {
  const workbook = XLSX.readFile(file.path);
  console.log(file.path, 'path');

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    raw: false, // 保留原始格式
    dateNF: 'YYYY-M-D HH:mm:ss' // 自定义日期格式
  });
  return jsonData;
};
