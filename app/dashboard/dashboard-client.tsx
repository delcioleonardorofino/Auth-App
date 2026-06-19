"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {signOut, getAccounts} from '@/lib/actions/auth-actions';
import {Settings, SquareArrowRightExit} from 'lucide-react';
import Avatar from "../components/Avatar";
import {useEffect, useState} from "react";


export type UserProfile = {
 id: string;
 email: string;
 emailVerified: boolean;
 name: string;
 createdAt: Date;
 updatedAt: Date;
 image?: string | null | undefined;
}

type Account = {
 id: string;
 provider: string;
 createdAt: Date;
 updatedAt: Date;
 accountId: string;
 scopes: string[];
}

export default function DashboardClientPage({ user }: { user: UserProfile }) {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[] | undefined>([]);

  // Redirect to auth if not authenticated

  const handleSignOut = async () => {
    await signOut();

    router.push("/auth");
  };

  useEffect(() => {
    async function fetchAccounts(){
    try {
      const accounts: Account[] | undefined = await getAccounts(user.id);
      setAccounts(accounts ?? []);
    } 
    catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }
  fetchAccounts();
  }, [])
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pt-20">
        
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6 md:flex-row flex-col gap-4">
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Seja bem-vindo ao teu Dashboard!
                </h2>
                <p className="text-gray-600">
                  Gerencie sua conta e explore os recursos do better-auth
                </p>
              </div>
              <div className="flex items-center space-x-3 justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar name={user?.name} image={user?.image} />
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium">{user.name}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                
                <Link href="/profile"
                className='p-2 rounded-md bg-amber-50 hover:bg-gray-100 transition-colors'>
                  <Settings className="h-5 w-5 size={24} text-gray-500 transition-colors hover:text-gray-700" />
                </Link>

              <SquareArrowRightExit
              onClick={handleSignOut}
              className="h-5 w-5 mr-2 size={24} text-red-600 cursor-pointer" 
              />
              </div>
            </div>

            {/* Authentication Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Status de Autenticação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-700">Status:</span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Autenticado
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Provider:</span>
                  <span className="ml-2 text-black">Better-Auth</span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">ID do Usuário:</span>
                  <span className="ml-2 text-blue-950">{user.id}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">
                    Email Verificado:
                  </span>
                  <span className="ml-2 text-blue-600">
                    {user.emailVerified ? 
                    <span className="text-green-500">Sim</span> : <span className="text-red-500">Não</span>}
                  </span>
                </div>
              </div>
            </div>

            {/* Demo Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Conta Social
                </h3>
                <p className="text-gray-600 text-sm">
                  Autentique-se usando suas contas sociais favoritas como Google e GitHub.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Gerenciamento de Usuários
                </h3>
                <p className="text-gray-600 text-sm">
                  Gerencie contas de usuário, perfis e configurações de autenticação.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Accesso seguro
                </h3>
                <p className="text-gray-600 text-sm">
                  Rotas protegidas e fluxo de autenticação seguro com
                  better-auth.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  ← Back to Home
                </Link>
                <Link
                  href="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Manage Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
