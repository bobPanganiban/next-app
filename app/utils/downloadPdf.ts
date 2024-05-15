import html2canvas from "html2canvas-pro";
import jsPdf from "jspdf";

export const downloadPDF = (
  filename: string,
  count: "S" | "D" | "T",
  selector: string
): boolean => {
  const capture: HTMLElement = document.querySelector(selector)!;
  html2canvas(capture).then((canvas: HTMLCanvasElement) => {
    console.log("count", count);
    const imgData = canvas.toDataURL("img/png");
    const doc = new jsPdf("p", "in", "letter");
    const componentWidth = doc.internal.pageSize.getWidth();
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(9);
    doc.text("ORIGINAL", 7.5, 0.4);
    doc.addImage(imgData, "PNG", 0, 0.5, componentWidth, 5.5);
    if (count === "D" || count === "T") {
      doc.addPage();
      doc.text("DUPLICATE", 7.4, 0.4);
      doc.addImage(imgData, "PNG", 0, 0.5, componentWidth, 5.5);
    }
    if (count === "T") {
      doc.addPage();
      doc.text("TRIPLICATE", 7.4, 0.4);
      doc.addImage(imgData, "PNG", 0, 0.5, componentWidth, 5.5);
    }
    doc.save(`${filename}.pdf`);

    return true;
  });

  return false;
};
