using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    public abstract class BaseLogic:IDisposable
    {
        protected readonly AutoRentContext DB;

        public BaseLogic(AutoRentContext db)
        {
            DB = db;
        }

        public void Dispose()
        {
            DB.Dispose();
        }
    }
}
