export const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

export const userRows = rows.map((row) => {
  return {
    id: row.id,
    username: `${row.firstName} ${row.lastName}`,
    email: 'john@mail.com',
    status: 'active',
    transaction: '$120',
    avatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
  };
});

export const productRows = rows.map((row) => {
  return {
    id: row.id,
    name: 'Apple Airpods',
    avatar:
      'https://images.unsplash.com/photo-1604548530945-fbdce3e76bc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
    stock: 123,
    status: 'active',
    price: '$120.00'
  };
});

export const productData = [
  {
    name: 'Jan',
    Sales: 4000
  },
  {
    name: 'Feb',
    Sales: 3000
  },
  {
    name: 'Mar',
    Sales: 5000
  }
];
