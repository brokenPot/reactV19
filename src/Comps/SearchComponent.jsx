import  { useState, useDeferredValue } from 'react';

function SearchComponent() {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);  // query의 지연값

    const handleChange = (event) => {
        setQuery(event.target.value);  // 사용자가 입력한 값
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search..."
            />
            <SearchResults query={deferredQuery} />  {/* 지연된 query 사용 */}
        </div>
    );
}

/* eslint-disable react/prop-types */
function SearchResults({ query }) {
    const results = getSearchResults(query);  // query로 검색 결과 필터링

    return (
        <div>
            {results.length === 0 && <p>No results found</p>}
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
}

// 더미 데이터와 간단한 필터 함수
const allResults = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];

function getSearchResults(query) {
    if (!query) return [];
    return allResults.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
    );
}

export default SearchComponent;
