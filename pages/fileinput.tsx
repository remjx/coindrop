import { FileInput } from '../components/Buttons/file-input/FileInput';

const Test = () => (
    <FileInput
      text="Upload photo"
      id="avatar-input"
      inputRef="test"
      accept="image/png, image/jpeg, image/webp"
      onChange={() => null}
    />
);

export default Test;
