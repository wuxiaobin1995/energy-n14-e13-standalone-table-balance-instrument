/*
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 10:05:30
 * @LastEditTime: 2023-02-02 15:48:38
 * @Description : Dexie
 */
import Dexie from 'dexie'

export function initDB() {
  const db = new Dexie('Energy_N14_E13_Standalone_Table_Balance_Instrument') // 与项目名保持一致
  db.version(1).stores({
    user: 'userId,userName',
    test_data:
      '++,userId,pdfTime,type,[userId+type],[userId+pdfTime],[userId+type+pdfTime]',
    train_data:
      '++,userId,pdfTime,type,posture,[userId+type],[userId+pdfTime],[userId+type+pdfTime]'
  })
  return db
}
