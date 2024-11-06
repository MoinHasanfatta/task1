import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editUserId, setEditUserId] = useState(null);

    // Fetch users from backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
    };

    const addUser = async () => {
        const newUser = { name, email };
        const response = await axios.post('http://localhost:3000/users', newUser);
        setUsers([...users, response.data]);
        setName('');
        setEmail('');
    };

    const updateUser = async () => {
        const updatedUser = { name, email };
        const response = await axios.patch(`http://localhost:3000/users/${editUserId}`, updatedUser);
        setUsers(users.map(user => (user._id === editUserId ? response.data : user)));
        setEditUserId(null);
        setName('');
        setEmail('');
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3000/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
    };

    const handleEdit = (user) => {
        setEditUserId(user._id);
        setName(user.name);
        setEmail(user.email);
    };

    return (
        <div className="App">
            <h1>User CRUD</h1>
            
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {editUserId ? (
                    <button onClick={updateUser}>Update User</button>
                ) : (
                    <button onClick={addUser}>Add User</button>
                )}
            </div>

            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} ({user.email})
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
