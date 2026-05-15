import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Save, X } from 'lucide-react'
import Step1Info from './steps/Step1Info'
import Step2Visibility from './steps/Step2Visibility'
import Step3FileType from './steps/Step3FileType'
import Step4Editor from './steps/Step4Editor'
import Step5Preview from './steps/Step5Preview'
import api from '../../services/api'

const STEPS = [
  { number: 1, label: 'Informations' },
  { number: 2, label: 'Visibilité' },
  { number: 3, label: 'Type de fichier' },
  { number: 4, label: 'Éditeur' },
  { number: 5, label: 'Aperçu final' },
]

export default function EditCourseNew() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    api.get('/api/courses/my-courses').then((res) => {
      const course = res.data.find((c) => c.id === parseInt(id))
      if (course) {
        setData({
          title: course.title || '',
          description: course.description || '',
          category: course.category || '',
          tags: course.tags || '',
          visibility: course.visibility || 'public',
          allow_download: course.allow_download,
          fileType: course.file_type === 'upload' ? 'upload' : course.file_type === 'ipynb' ? 'notebook' : 'markdown',
          markdownContent: course.file_type === 'md' ? (course.html_content || '') : '',
          notebookCells: course.file_type === 'ipynb'
            ? [{ id: 1, type: 'markdown', content: course.html_content || '' }]
            : [{ id: 1, type: 'markdown', content: '' }],
          uploadedFile: null,
          status: course.status || 'draft',
          courseId: course.id,
        })
      }
    }).catch(() => setError('Erreur de chargement'))
    .finally(() => setLoading(false))
  }, [id])

  const updateData = (fields) => {
    setData((prev) => ({ ...prev, ...fields }))
  }

  const handleCancel = () => navigate('/teacher/dashboard')

  const handleSaveDraft = async () => {
    setSaving(true)
    try {
      await submitCourse('draft')
      alert('Brouillon sauvegardé !')
    } catch {
      setError('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const submitCourse = async (status) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('tags', data.tags)
    formData.append('visibility', data.visibility)
    formData.append('allow_download', data.allow_download)
    formData.append('status', status)
    formData.append('source_type', data.fileType === 'upload' ? 'upload' : 'editor')

    if (data.fileType === 'markdown' && data.markdownContent) {
      const blob = new Blob([data.markdownContent], { type: 'text/plain' })
      formData.append('file', blob, 'cours.md')
    } else if (data.fileType === 'notebook') {
      const nb = {
        nbformat: 4,
        nbformat_minor: 5,
        metadata: { kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' } },
        cells: data.notebookCells.map((cell) => ({
          cell_type: cell.type === 'code' ? 'code' : 'markdown',
          source: cell.content,
          metadata: {},
          outputs: [],
          execution_count: null,
        })),
      }
      const blob = new Blob([JSON.stringify(nb, null, 2)], { type: 'application/json' })
      formData.append('file', blob, 'cours.ipynb')
    } else if (data.fileType === 'upload' && data.uploadedFile) {
      formData.append('file', data.uploadedFile)
    }

    await api.put('/api/courses/' + id + '/full', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  const handlePublish = async () => {
    setSaving(true)
    setError('')
    try {
      await submitCourse('published')
      navigate('/teacher/dashboard')
    } catch {
      setError('Erreur lors de la publication')
    } finally {
      setSaving(false)
    }
  }

  const canGoNext = () => {
    if (currentStep === 1) return data?.title?.trim() !== ''
    if (currentStep === 3) return data?.fileType !== null
    return true
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={handleCancel} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <X size={18} />
          </button>
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-dark">Modifier le cours</h1>
            <p className="text-gray-500 text-sm mt-0.5">Étape {currentStep} sur {STEPS.length}</p>
          </div>
        </div>
        <button
          onClick={handleSaveDraft}
          disabled={saving}
          className="flex items-center gap-2 border border-primary-200 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          <Save size={15} />
          Enregistrer brouillon
        </button>
      </div>

      {/* Indicateur d'étapes */}
      <div className="flex items-center mb-10">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <button
                onClick={() => step.number < currentStep && setCurrentStep(step.number)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step.number === currentStep
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                    : step.number < currentStep
                    ? 'bg-primary-600 text-white cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {step.number < currentStep ? '✓' : step.number}
              </button>
              <span className={`text-xs mt-1.5 font-medium hidden sm:block ${
                step.number === currentStep ? 'text-primary-600' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-[-18px] ${
                step.number < currentStep ? 'bg-primary-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-8">
        {currentStep === 1 && <Step1Info data={data} updateData={updateData} />}
        {currentStep === 2 && <Step2Visibility data={data} updateData={updateData} />}
        {currentStep === 3 && <Step3FileType data={data} updateData={updateData} />}
        {currentStep === 4 && <Step4Editor data={data} updateData={updateData} />}
        {currentStep === 5 && (
          <Step5Preview data={data} onPublish={handlePublish} onBack={() => setCurrentStep(4)} saving={saving} />
        )}
      </div>

      {currentStep < 5 && (
        <div className="flex items-center justify-between pb-8">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={15} />
            Précédent
          </button>
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canGoNext()}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Suivant
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  )
}