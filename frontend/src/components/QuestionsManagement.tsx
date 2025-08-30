import React from 'react';
import { questionsAPI } from '../services/api';

type Question = {
  id: string | number;
  text: string;
  options: Record<string, string>;
  correctAnswer: string;
};

const emptyQuestion: Question = {
  id: '',
  text: '',
  options: { A: '', B: '', C: '', D: '' },
  correctAnswer: 'A',
};

const QuestionsManagement: React.FC = () => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [editing, setEditing] = React.useState<Question | null>(null);
  const [form, setForm] = React.useState<Question>(emptyQuestion);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const res = await questionsAPI.getQuestions();
      const normalized: Question[] = (res.data || []).map((q: any) => ({
        id: q.id,
        text: q.text ?? q.question_text ?? '',
        options: q.options ?? {},
        correctAnswer: q.correctAnswer ?? q.correct_answer ?? ''
      }));
      setQuestions(normalized);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadQuestions();
  }, []);

  const resetForm = () => {
    setForm(emptyQuestion);
    setEditing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await questionsAPI.updateQuestion(String(editing.id), {
          text: form.text,
          options: form.options,
          correctAnswer: form.correctAnswer,
        });
      } else {
        await questionsAPI.createQuestion({
          text: form.text,
          options: form.options,
          correctAnswer: form.correctAnswer,
        });
      }
      resetForm();
      await loadQuestions();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save question');
    }
  };

  const handleEdit = (q: Question) => {
    setEditing(q);
    setForm(q);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await questionsAPI.deleteQuestion(String(id));
      await loadQuestions();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete question');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Questions</h1>
          {error && <div className="mt-4 p-3 rounded bg-red-100 text-red-700">{error}</div>}
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            <input
              className="input-field"
              placeholder="Question text"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['A','B','C','D'] as const).map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-6 font-semibold">{key})</span>
                  <input
                    className="input-field flex-1"
                    placeholder={`Option ${key}`}
                    value={form.options[key] || ''}
                    onChange={(e) => setForm({ ...form, options: { ...form.options, [key]: e.target.value } })}
                    required
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2 font-medium">Correct Answer</label>
              <select
                className="input-field"
                value={form.correctAnswer}
                onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
              >
                {(['A','B','C','D'] as const).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                {editing ? 'Update Question' : 'Add Question'}
              </button>
              {editing && (
                <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
              )}
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((q) => (
            <div key={q.id} className="card p-4">
              <div className="font-semibold mb-2">{q.text}</div>
              <ul className="mb-3 text-sm text-gray-700 space-y-1">
                {Object.entries(q.options).map(([k,v]) => (
                  <li key={k} className={`p-2 rounded border ${q.correctAnswer === k ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                    <span className="font-medium mr-2">{k})</span>{v}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button className="btn-secondary" onClick={() => handleEdit(q)}>Edit</button>
                <button className="btn-primary" onClick={() => handleDelete(q.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionsManagement;


