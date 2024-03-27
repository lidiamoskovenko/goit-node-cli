import { promises as fs } from 'fs';

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
    try {
        const readContacts = await fs.readFile(contactsPath);
        return JSON.parse(readContacts);
      } catch (err) {
        console.log(err);
      }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts.find((contact) => contact.id === contactId) || null;
      } catch (err) {
        console.log(err);
      }}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const deleteContact = contacts.find((item) => item.id === contactId);
        if (!deleteContact) {
            return null;
        }
        const updateContactsList = contacts.filter((item) => item.id !== deleteContact.id);
        await fs.writeFile(contactsPath, JSON.stringify(updateContactsList));
    
        return deleteContact;
      } catch (err) {
        console.log(err);
      } 
}

export async function addContact(name, email, phone) {
    try {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
      const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
  
      return newContact;
    } catch (err) {
      console.log(err);
    }
  }