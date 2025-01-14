import { useActionState, useOptimistic } from "react";

/* eslint-disable react/prop-types */
export function ChangeName({ name, setName }) {
    // 낙관적 업데이트 상태 정의
    const [optimisticName, setOptimisticName] = useOptimistic(
        { name },
        (state, newName) => ({ ...state, name: newName })
    );

    const [error, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const newName = formData.get("name");

            // 지연 추가 (2초)
            setOptimisticName(newName);
            // 이름 설정
            setName(newName);

            try {
                // 실제 작업 처리 (지연 추가)
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setName(newName); // 실제 상태 업데이트
            } catch (e) {
                setOptimisticName(name); // 낙관적 상태 롤백
            }

            return null; // 성공
        },
        null
    );
    return (
        <div>
            <form action={submitAction}>
                <input type="text" name="name"/>
                <button type="submit" disabled={isPending}>
                    Update
                </button>
                {error && <p>{error}</p>}
            </form>
            {isPending ? (
                <div>{optimisticName.name + " (...sending)"}</div>
            ) : (<>{name}</>
            )}
        </div>
    );
}
