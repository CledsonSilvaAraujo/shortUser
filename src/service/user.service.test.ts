import userService from './user.service';

import db from '../infra/db';

beforeAll( async () => {
	await db.connect();
});
afterAll( async () => {
  await db.cleanDatabase();
})




describe('should test basic features in user service',  () => {
  test('createUser and find update and delete user', async () => {
    const userBefore = await userService.createUser('Joãozinho');
    const _id = userBefore._id.toString();
    await userService.updateUserById(_id, { name : 'Cledson'});
    const userAfter = await userService.findUser( _id );
    await userService.deleteUser( _id );
    const userAfterAll =  await userService.findUser( _id );

    expect(userBefore).toBeTruthy();
    expect(userAfter?.name).toBe("Cledson");
    expect(userAfterAll).toBeFalsy();
  });

  //aqui eu quero fazer um teste usando nock
  // test('if link its being associated with user', async () => {
  //   const userInserted = await userService.createUser('Joãozinho');
  //   const _id = userInserted._id.toString();
  //   await userService.updateUserById(_id, { name : 'Cledson'});
  //   const userAfter = await userService.findUser( _id );
  //   await userService.deleteUser( _id );
  //   const userAfterAll =  await userService.findUser( _id );

  //   expect(userBefore).toBeTruthy();
  //   expect(userAfter?.name).toBe("Cledson");
  //   expect(userAfterAll).toBeFalsy();
  // });

})



describe('create user',  () => {
  test('if number of caracteres in user name is less then 2', async () => {
   try{
    const userBefore = await userService.createUser('Joãozinho');
   }catch(err){
    expect(err.message).toBe("TAL");
   }
  });


})