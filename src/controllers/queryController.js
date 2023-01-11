import Contact from '../models/Contact.js';

export class QueryController {
  static async queryOne(req, res) {
    try {
      const { names, email, subject, message } = req.body;
      const query = new Contact({
        names,
        email,
        subject,
        message,
      });
      await query.save();
      return res.status(200).json({ message: 'Query sent !!' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async viewQueries(req, res) {
    try {
      const queries = await Contact.find();
      return res.status(200).json({ queries });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  static async deleteQuery(req, res) {
    try {
      await Contact.deleteOne({ _id: req.params.id });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

export default QueryController;
