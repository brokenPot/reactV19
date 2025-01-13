import { useActionState } from "react";

// useOptimistic, use

/* eslint-disable react/prop-types */
export function ChangeName({ name, setName }) {
    const [error, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const newName = formData.get("name");

            // 지연 추가 (2초)
            await new Promise((resolve) => setTimeout(resolve, 100));

            // 이름 설정
            setName(newName);

            // 임의로 에러를 발생시키고 싶다면 여기 추가
            // if (newName === "error") {
            //     return "An error occurred!";
            // }

            return null; // 성공
        },
        null
    );

    return (
        <div>
                <form action={submitAction}>
                    <input type="text" name="name" />
                    <button type="submit" disabled={isPending}>
                        Update
                    </button>
                    {error && <p>{error}</p>}
                </form>
            {isPending ? (
                <div>Loading...</div>
            ) : (
                <div>{name}</div>

            )}
        </div>
    );
}
