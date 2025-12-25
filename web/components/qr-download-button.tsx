"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import { QrCode, Download } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface QRDownloadButtonProps {
    publicId: string;
}

export function QRDownloadButton({ publicId }: QRDownloadButtonProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const resolverUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/t/${publicId}`;

    const downloadQR = () => {
        const canvas = document.getElementById(`qr-${publicId}`) as HTMLCanvasElement;
        if (!canvas) return;

        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `qr-${publicId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <QrCode className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Descargar Código QR</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-inner border">
                        <QRCodeCanvas
                            id={`qr-${publicId}`}
                            value={resolverUrl}
                            size={256}
                            level={"H"}
                            includeMargin={true}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                        Este código QR redirige dinámicamente a:<br />
                        <code className="text-primary font-mono">{resolverUrl}</code>
                    </p>
                    <Button onClick={downloadQR} className="w-full gap-2">
                        <Download className="size-4" />
                        Descargar PNG
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
