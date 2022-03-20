import mongoose from 'mongoose'

export interface Game {
  id: string
  title: string
  category: 'OTHER' | 'GAME' | 'PROJECT'
  description: string
}

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['OTHER', 'GAME', 'PROJECT'], default: 'OTHER' },
  description: { type: String, required: true },
})

export default mongoose.models.Game || mongoose.model<Game>('Game', GameSchema)