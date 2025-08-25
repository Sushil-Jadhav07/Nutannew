import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const FirebaseExample: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; text: string; timestamp: any }>>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Signed in successfully!');
    } catch (error: any) {
      setMessage(`Error signing in: ${error.message}`);
    }
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Account created successfully!');
    } catch (error: any) {
      setMessage(`Error creating account: ${error.message}`);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setMessage('Signed out successfully!');
    } catch (error: any) {
      setMessage(`Error signing out: ${error.message}`);
    }
  };

  const addMessage = async () => {
    if (!user || !message.trim()) return;
    
    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
        userId: user.uid,
        timestamp: new Date()
      });
      setMessage('');
      loadMessages();
    } catch (error: any) {
      setMessage(`Error adding message: ${error.message}`);
    }
  };

  const loadMessages = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text || '',
        timestamp: doc.data().timestamp || null
      }));
      setMessages(messagesData);
    } catch (error: any) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    if (user) {
      loadMessages();
    }
  }, [user]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Firebase Example</h2>
      
      {!user ? (
        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={signIn}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={signUp}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-green-600">Welcome, {user.email}!</p>
          
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addMessage}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Send Message
            </button>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Recent Messages:</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className="p-2 bg-gray-100 rounded text-sm">
                  {msg.text}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={signOutUser}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default FirebaseExample;
