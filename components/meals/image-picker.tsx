"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

type ImagePickerProps = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);

  function handlePickClick(event: React.MouseEvent<HTMLButtonElement>) {
    imageInput.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const selectedFile = files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };

    fileReader.readAsDataURL(selectedFile);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="The image seleted by user" fill />}
        </div>
        <input className={classes.input} type="file" id={name} name={name} accept="image/png, image/jpeg" ref={imageInput} onChange={handleImageChange} />
        <button type="button" className={classes.button} onClickCapture={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
