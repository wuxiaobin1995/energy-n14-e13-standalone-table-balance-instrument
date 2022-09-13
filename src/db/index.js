/*
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 10:05:30
 * @LastEditTime: 2022-04-24 14:34:49
 * @Description : Dexie
 */
import Dexie from 'dexie'

export function initDB() {
  const db = new Dexie('Energy_N14_E13_Standalone_Table_Balance_Instrument') // 与项目名保持一致
  db.version(1).stores({
    user: 'userId,userName,sex,birthday,affectedSide',
    test_data:
      '++,userId,pdfTime,type,[userId+type],[userId+pdfTime],[userId+pdfTime+type]',
    train_data:
      '++,userId,pdfTime,type,[userId+type],[userId+pdfTime],[userId+pdfTime+type]'
  })
  return db
}
