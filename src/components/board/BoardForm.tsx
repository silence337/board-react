import React, { useEffect } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

type FormValues = {
  title: string;
  content: string;
  author: string;
};

interface Props {
  onSubmit: (data: FormValues) => void | Promise<void>;
  initialValues?: Partial<FormValues>;
}

const BoardForm = ({ onSubmit, initialValues }: Props) => {
  //const { setValue } = useForm();
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    setValue,
    //formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      title: initialValues?.title || '',
      content: initialValues?.content || '',
      author: initialValues?.author || '',
    },
  });

  const onValid = (data: FormValues) => {
    onSubmit(data);
  };

  const onInvalid = (errors: FieldErrors<FormValues>) => {
    //alert 으로 error 출력
    const firstError =
      errors.title?.message ||
      errors.author?.message ||
      errors.content?.message;
    if (firstError) alert(firstError);
  };

  useEffect(() => {
    console.log(initialValues);
    if (initialValues) {
      console.log(initialValues.title);
      setValue('title', initialValues.title || '');
      setValue('content', initialValues.content || '');
      setValue('author', initialValues.author || '');
    } else {
      setValue('author', user?.displayName ?? '');
    }
  }, [initialValues, user, setValue]);

  return (
    <div className=''>
      <table className='table_board_view'>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input
                className=''
                {...register('title', {
                  required: '제목을 입력하세요.',
                  validate: (v) =>
                    v.trim() !== '' || '제목은 공백만 입력할 수 없습니다.',
                })}
                placeholder='제목'
              />
            </td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>
              {user?.displayName}
              {/* <input
                className=''
                {...register('author', {
                  required: '작성자를 입력하세요.',
                  validate: (v) =>
                    v.trim() !== '' || '작성자는 공백만 입력할 수 없습니다.',
                })}
                placeholder='작성자'
              /> */}
            </td>
          </tr>
          <tr className='table_board_view-content'>
            <th>내용</th>
            <td>
              <div className='table_board_view-textwrap'>
                <textarea
                  className=''
                  {...register('content', {
                    required: '내용을 입력하세요.',
                    validate: (v) =>
                      v.trim() !== '' || '내용은 공백만 입력할 수 없습니다.',
                  })}
                  placeholder='내용'
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='button_wrap'>
        <button
          type='submit'
          onClick={handleSubmit(onValid, onInvalid)}
          className='button -flower'
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default BoardForm;
