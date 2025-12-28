"use client"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

const DownloadCertificate = ({courseId, totalProgress}) => {
    const [isCertificateDownloading, setIsCertificateDownloading] = useState(false)

    function handelCertificateDownload(){
        try {
            fetch(`/api/certificate?courseId=${courseId}`)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "Certificate.pdf"
                document.body.appendChild(a)
                a.click()
                a.remove()
            })
            setIsCertificateDownloading(true)
            toast.success("Certificate has been downloaded!")
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsCertificateDownloading(false)
        }
    }

    return (
        <>
            <Button 
            className="w-full mt-6"
            disabled={totalProgress < 100}
            onClick={handelCertificateDownload} 
            >
                Download Certificate
            </Button>

        </>
    )
}

export default DownloadCertificate
