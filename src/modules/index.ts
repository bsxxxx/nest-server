import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { CoursetableModule } from './coursetable/coursetable.module';
import { SalaryModule } from './salary/salary.module';
import { NetworkDiskModule } from './network-disk/network-disk.module';
import { RechargeRecordModule } from './recharge-record/recharge-record.module';
import { SellModule } from './sell/sell.module';
import { SellStudentModule } from './sell-student/sell-student.module';
import { SendTextbookRecordsModule } from './send-textbook-records/send-textbook-records.module';
import { BonusModule } from './bonus/bonus.module';
export default [
  UserModule,
  AuthModule,
  StudentModule,
  FilesModule,
  CoursetableModule,
  SalaryModule,
  NetworkDiskModule,
  RechargeRecordModule,
  SellModule,
  SellStudentModule,
  SendTextbookRecordsModule,
  BonusModule,
];
