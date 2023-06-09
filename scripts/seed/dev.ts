import db from '../../src/modules/db';

// const prisma = new PrismaClient();
async function main() {
    const user = await db.user.createMany({
        data: [{
            email: "user2s192@tusenti.com",
            password: "123456",
            username: "John Doe",
    },
{
    email: "user402i0@tusenti.com",
    password: "123456",
    username: "Jane Doe",
}]
})
    console.log("Done Seeded");
}

main()
    .catch((e: Error) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    })
// const run = async () => {
//   const users = [
//     {
//       username: 'user1',
//       email: 'user1@example.com',
//       password: 'password1',
//     },
//     {
//       username: 'user2',
//       email: 'user2@example.com',
//       password: 'password2',
//     },
//     // Add more users as needed
//   ];

//   // Create users in the database
//   await db.user.createMany({ data: users });

//   const transactions = [
//     {
//       amount: 100,
//       type: TransactionType.DEBIT,
//       userId: users,
//     },
//     {
//       amount: 200,
//       type: TransactionType.CREDIT,
//       userId: users,
//     },
//     // Add more transactions as needed
//   ];

//   // Create transactions in the database
//   await db.transaction.createMany({ data: transactions });

//   console.log('Data seed complete');
// };

// run()
//   .catch((error) => {
//     console.error('Error seeding data:', error);
//   })
//   .finally(() => {
//     db.$disconnect();
//   });
