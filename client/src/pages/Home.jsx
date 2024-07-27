import { useRef, useState } from 'react'
import { Button } from '../components'
import { RiFileExcel2Line } from 'react-icons/ri'
import api from '../api'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const initialState = {
        sheetName: '',
        skipRows: '',
        columnIndices: []
    }
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState(initialState)
    const fileInputRef = useRef(null)
    const navigate = useNavigate()
    const handleFileUpload = () => fileInputRef.current.click()

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
        if (allowedTypes.includes(file.type)) {
            setFile(file)
        } else {
            alert('Only Excel files are allowed')
        }
    }
    const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = new FormData()
            data.append('file', file)
            data.append('data', JSON.stringify(formData))
            await api.uploadFile(data)
            setFile(null)
            setFormData(initialState)
            alert('Data uploaded sucessfully')
            navigate('/details')
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }
    const handleClear = () => setFile(null)
    return (
        <main className="container mx-auto">
            <section className="bg-slate-500 my-20 p-10 rounded-xl flex items-center">
                <form className="flex w-full" onSubmit={handleSubmit}>
                    <div className="w-1/2 flex gap-10 flex-col justify-center">
                        <label htmlFor="file" className="text-lg">
                            Upload any Excel file containing your data
                        </label>
                        <input id="file" type="file" ref={fileInputRef} accept=".xlsx, .xls" onChange={handleFileChange} className="hidden" />
                        <div id="button-group">
                            <Button isDisabled={file} clickHandler={handleFileUpload}>
                                Upload
                            </Button>
                            <Button type="reset" clickHandler={handleClear}>
                                Clear
                            </Button>
                        </div>
                    </div>
                    <div className="w-1/2 p-10 min-h-96">
                        {file ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="sheetName">Sheet Name</label>
                                    <input
                                        onChange={handleChange}
                                        name="sheetName"
                                        value={formData.sheetName}
                                        type="text"
                                        required
                                        id="sheetName"
                                        className="h-10 bg-transparent ring-1 ring-black rounded-md text-xl px-3"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="skipRows">Skip Rows</label>
                                    <input
                                        onChange={handleChange}
                                        name="skipRows"
                                        value={formData.skipRows}
                                        type="numeric"
                                        pattern="\d*"
                                        required
                                        id="skipRows"
                                        className="h-10 bg-transparent ring-1 ring-black rounded-md text-xl px-3"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="columnIndices">Column Indices</label>
                                    <input
                                        onChange={handleChange}
                                        name="columnIndices"
                                        value={formData.columnIndices}
                                        type="text"
                                        required
                                        pattern="[0-9]+(,[0-9]+)*"
                                        id="columnIndices"
                                        className="h-10 bg-transparent ring-1 ring-black rounded-md text-xl px-3"
                                    />
                                </div>
                                <div>
                                    <Button isDisabled={!file} type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <RiFileExcel2Line className="size-96 text-green-500" />
                        )}
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Home
