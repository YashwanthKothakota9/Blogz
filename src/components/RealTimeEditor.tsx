import { Control, Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

interface RealTimeEditorProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  defaultValue?: string;
}

export default function RealTimeEditor({
  name,
  control,
  label,
  defaultValue = '',
}: RealTimeEditorProps) {
  console.log('From RTE:');
  console.log(defaultValue);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="101ppilwg70kwc18m5om82x16eayw3j6gxeucgr0j2ow9fj3"
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'codesample',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'codesample | bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:"Space Grotesk",Arial,sans-serif; font-size:16px }',
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
