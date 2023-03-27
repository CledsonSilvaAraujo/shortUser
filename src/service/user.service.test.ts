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
    expect(userBefore).toBeTruthy();
  });

  test('updateUser', async () => {
    const userBefore = await userService.createUser('Joãozinho');
    const _id = userBefore._id.toString();
    await userService.updateUserById(_id, { name : 'Cledson'});
    const userAfter = await userService.findUser( _id );
    expect(userBefore).toBeTruthy();
    expect(userAfter?.name).toBe("Cledson");
  });

  test('deleteUser', async () => {
    const userBefore = await userService.createUser('Joãozinho');
    const _id = userBefore._id.toString();
    await userService.deleteUser( _id );
    const userAfterAll =  await userService.findUser( _id );
    expect(userBefore).toBeTruthy();
    expect(userAfterAll).toBeFalsy();
  });

  test.only('if number of caracteres in user name is less then 2', async () => {
        const error = await userService.createUser('T');
        expect(error.message).toBe("Name is to short");
       
  });
    

})


