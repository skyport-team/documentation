"use client"

import { useEffect, useState, useRef, Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import Link from 'next/link'
import Fuse from 'fuse.js'

function SearchIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" {...props}>
      <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
    </svg>
  )
}

export function Search() {
  let [isOpen, setIsOpen] = useState(false)
  let [modifierKey, setModifierKey] = useState('')
  let [query, setQuery] = useState('')
  let [results, setResults] = useState([])
  let fuseRef = useRef(null)

  useEffect(() => {
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.platform === 'string') {
        setModifierKey(
          /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl '
        )
      }
    } catch (error) {
      setModifierKey('Ctrl ')
    }

    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data) => {
        fuseRef.current = new Fuse(data, {
          keys: [
            { name: 'title', weight: 3 },
            { name: 'description', weight: 2 },
            { name: 'content', weight: 1 }
          ],
          threshold: 0.3,
          ignoreLocation: true,
          includeMatches: true
        })
      })
      .catch((err) => console.error("Error loading search index", err))
  }, [])

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (query && fuseRef.current) {
      setResults(fuseRef.current.search(query).slice(0, 10))
    } else {
      setResults([])
    }
  }, [query])

  function onOpen() { setIsOpen(true) }
  function onClose() { 
    setIsOpen(false)
    setQuery('') 
  }

  return (
    <>
      <button
        type="button"
        className="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-neutral-200 md:hover:ring-neutral-300 dark:md:bg-neutral-800/75 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:bg-neutral-700/40 dark:md:hover:ring-neutral-500 lg:w-96"
        onClick={onOpen}
      >
        <SearchIcon className="h-5 w-5 flex-none fill-neutral-400 group-hover:fill-neutral-500 dark:fill-neutral-500 md:group-hover:fill-neutral-400" />
        <span className="sr-only md:not-sr-only md:ml-2 md:text-neutral-500 md:dark:text-neutral-400">
          Search docs
        </span>
        {modifierKey && (
          <kbd className="ml-auto hidden font-medium text-neutral-400 dark:text-neutral-500 md:block">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        )}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="mx-auto max-w-xl transform divide-y divide-neutral-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all dark:divide-neutral-700 dark:bg-neutral-800 dark:ring-neutral-700">
                <div className="relative">
                  <SearchIcon className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 fill-neutral-400" aria-hidden="true" />
                  <input
                    type="text"
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:ring-0 sm:text-sm dark:text-white outline-none"
                    placeholder="Search documentation..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                </div>

                {results.length > 0 && (
                  <ul className="max-h-96 overflow-y-auto p-2 text-sm text-neutral-700 dark:text-neutral-300">
                    {results.map((result) => (
                      <li key={result.item.url}>
                        <Link 
                          href={result.item.url}
                          onClick={onClose}
                          className="group flex cursor-default select-none items-center rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                        >
                          <div className="flex-auto">
                            <p className="font-semibold text-neutral-900 dark:text-white">{result.item.title}</p>
                            {result.item.description && (
                              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">{result.item.description}</p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {query && results.length === 0 && (
                  <p className="p-4 text-sm text-neutral-500 dark:text-neutral-400 text-center">
                    No results found for "{query}".
                  </p>
                )}
                {!query && (
                  <div className="p-4 text-xs text-neutral-400 dark:text-neutral-500 text-center">
                    Try searching for "API", "Installation", etc.
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
