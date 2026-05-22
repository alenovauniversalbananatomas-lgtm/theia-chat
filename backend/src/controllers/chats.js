import { getProjectById as _getProjectById } from '../services/projectsService.js';
import { createChat, getChatsByProject, getChatById, updateChat, deleteChat } from '../services/chatsService.js';

export async function createChatHandler(req, res) {
  const { id: projectId } = req.params;
  const userId = req.user && req.user.userId;
  const { title, model } = req.body;
  try {
    const project = await _getProjectById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.user_id !== userId) return res.status(403).json({ error: 'No permission' });
    const chat = await createChat(projectId, title, model);
    return res.status(201).json({ chat });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not create chat' });
  }
}

export async function listChatsHandler(req, res) {
  const { id: projectId } = req.params;
  const userId = req.user && req.user.userId;
  try {
    const project = await _getProjectById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.user_id !== userId) return res.status(403).json({ error: 'No permission' });
    const chats = await getChatsByProject(projectId);
    return res.json({ chats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not fetch chats' });
  }
}

export async function getChatHandler(req, res) {
  const { id } = req.params;
  const userId = req.user && req.user.userId;
  try {
    const chat = await getChatById(id);
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    // verify ownership
    const project = await _getProjectById(chat.project_id);
    if (!project || project.user_id !== userId) return res.status(403).json({ error: 'No permission' });
    return res.json({ chat });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not fetch chat' });
  }
}

export async function updateChatHandler(req, res) {
  const { id } = req.params;
  const userId = req.user && req.user.userId;
  try {
    const chat = await getChatById(id);
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    const project = await _getProjectById(chat.project_id);
    if (!project || project.user_id !== userId) return res.status(403).json({ error: 'No permission' });
    const updated = await updateChat(id, req.body);
    return res.json({ chat: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not update chat' });
  }
}

export async function deleteChatHandler(req, res) {
  const { id } = req.params;
  const userId = req.user && req.user.userId;
  try {
    const chat = await getChatById(id);
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    const project = await _getProjectById(chat.project_id);
    if (!project || project.user_id !== userId) return res.status(403).json({ error: 'No permission' });
    const deleted = await deleteChat(id);
    if (!deleted) return res.status(404).json({ error: 'Chat not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not delete chat' });
  }
}
