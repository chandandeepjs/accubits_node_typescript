import * as db from '../helpers/common/db.helper';

class BaseModel {
   public async callQuery<T>(
      query: string,
      connType = 'normal',
      isAll = false
   ): Promise<T> {
      console.log('query call->', query);
      const result = await db.default.pdo(query, connType, isAll);
      return result as T;
   }

   async startTransaction(): Promise<void> {
      await this.callQuery('START TRANSACTION;');
   }
   async commitTransaction(): Promise<void> {
      await this.callQuery('COMMIT;');
   }
   async rollbackTransaction(): Promise<void> {
      await this.callQuery('ROLLBACK;');
   }
}
export default BaseModel;
